from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactForm(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    business_name: Optional[str] = None
    industry: Optional[str] = None
    city: Optional[str] = None
    phone: str
    email: EmailStr
    website: Optional[str] = None
    services_needed: Optional[List[str]] = []
    preferred_package: Optional[str] = None
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactFormCreate(BaseModel):
    name: str
    business_name: Optional[str] = None
    industry: Optional[str] = None
    city: Optional[str] = None
    phone: str
    email: EmailStr
    website: Optional[str] = None
    services_needed: Optional[List[str]] = []
    preferred_package: Optional[str] = None
    message: Optional[str] = None

class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

class AffiliateRegistration(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    experience: Optional[str] = None
    referral_code: str = Field(default_factory=lambda: str(uuid.uuid4())[:8].upper())
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AffiliateRegistrationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    experience: Optional[str] = None

class ConsultationBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    business_type: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ConsultationBookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    business_type: Optional[str] = None


# Routes
@api_router.get("/")
async def root():
    return {"message": "NIW AI Marketing API"}

@api_router.post("/contact", response_model=ContactForm)
async def create_contact(input: ContactFormCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactForm(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.post("/newsletter", response_model=NewsletterSubscription)
async def subscribe_newsletter(input: NewsletterSubscriptionCreate):
    existing = await db.newsletters.find_one({"email": input.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    subscription_dict = input.model_dump()
    subscription_obj = NewsletterSubscription(**subscription_dict)
    
    doc = subscription_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.newsletters.insert_one(doc)
    return subscription_obj

@api_router.post("/affiliate", response_model=AffiliateRegistration)
async def register_affiliate(input: AffiliateRegistrationCreate):
    affiliate_dict = input.model_dump()
    affiliate_obj = AffiliateRegistration(**affiliate_dict)
    
    doc = affiliate_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.affiliates.insert_one(doc)
    return affiliate_obj

@api_router.post("/consultation", response_model=ConsultationBooking)
async def book_consultation(input: ConsultationBookingCreate):
    booking_dict = input.model_dump()
    booking_obj = ConsultationBooking(**booking_dict)
    
    doc = booking_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.consultations.insert_one(doc)
    return booking_obj

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
