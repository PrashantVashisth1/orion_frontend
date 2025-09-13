# OrionEduverse Backend Requirements

## Overview
This document outlines the comprehensive backend requirements for the OrionEduverse startup platform, focusing on the startup profile management system.

## Tech Stack Recommendations

### Core Backend
- **Framework**: Node.js with Express.js or FastAPI (Python)
- **Database**: PostgreSQL (primary) + Redis (caching/sessions)
- **Authentication**: JWT tokens with refresh token rotation
- **File Storage**: AWS S3 or Cloudinary for image uploads
- **API Documentation**: Swagger/OpenAPI 3.0

### Optional Enhancements
- **Real-time**: Socket.io for live features
- **Search**: Elasticsearch for advanced startup discovery
- **Monitoring**: Sentry for error tracking
- **Email**: SendGrid or AWS SES

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

### Startup Profiles Table
```sql
CREATE TABLE startup_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    is_complete BOOLEAN DEFAULT FALSE,
    completion_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Personal Info Table
```sql
CREATE TABLE personal_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE CASCADE,
    profile_picture TEXT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    website TEXT,
    birth_date DATE,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Business Details Table
```sql
CREATE TABLE business_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE CASCADE,
    job_title VARCHAR(100) NOT NULL,
    company VARCHAR(100),
    industry VARCHAR(100) NOT NULL,
    experience VARCHAR(50),
    business_type VARCHAR(50),
    team_size VARCHAR(50),
    revenue VARCHAR(50),
    funding_stage VARCHAR(50),
    skills TEXT,
    goals TEXT,
    linkedin_profile TEXT,
    twitter_profile TEXT,
    github_profile TEXT,
    portfolio_website TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Company Details Table
```sql
CREATE TABLE company_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE CASCADE,
    company_logo TEXT,
    company_name VARCHAR(100) NOT NULL,
    founded_year INTEGER NOT NULL,
    company_email VARCHAR(255) NOT NULL,
    company_phone VARCHAR(20) NOT NULL,
    company_location VARCHAR(255) NOT NULL,
    company_website TEXT,
    company_description TEXT NOT NULL,
    vision TEXT NOT NULL,
    mission TEXT NOT NULL,
    team_size VARCHAR(50),
    company_type VARCHAR(50),
    industry VARCHAR(100) NOT NULL,
    revenue_range VARCHAR(50),
    legal_name VARCHAR(100),
    tax_id VARCHAR(50),
    registration_date DATE,
    business_license VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Offerings Table
```sql
CREATE TABLE offerings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE CASCADE,
    products JSONB DEFAULT '[]',
    services JSONB DEFAULT '[]',
    pricing_model VARCHAR(100),
    price_range VARCHAR(100),
    target_customers VARCHAR(255),
    revenue_streams VARCHAR(255),
    unique_value_proposition TEXT,
    competitive_advantage TEXT,
    support_model VARCHAR(100),
    onboarding_process VARCHAR(255),
    customer_success_strategy TEXT,
    future_offerings TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Interests Table
```sql
CREATE TABLE interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE CASCADE,
    primary_industry VARCHAR(100) NOT NULL,
    secondary_industry VARCHAR(100),
    primary_target_market VARCHAR(100),
    geographic_focus VARCHAR(100),
    market_description TEXT,
    partnership_goals TEXT,
    innovation_description TEXT,
    future_goals TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Technology Interests Table
```sql
CREATE TABLE technology_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE CASCADE,
    ai_ml BOOLEAN DEFAULT FALSE,
    blockchain BOOLEAN DEFAULT FALSE,
    cloud_computing BOOLEAN DEFAULT FALSE,
    cybersecurity BOOLEAN DEFAULT FALSE,
    iot BOOLEAN DEFAULT FALSE,
    fintech BOOLEAN DEFAULT FALSE,
    healthtech BOOLEAN DEFAULT FALSE,
    edtech BOOLEAN DEFAULT FALSE,
    sustainability_tech BOOLEAN DEFAULT FALSE,
    other_tech TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Partnership Interests Table
```sql
CREATE TABLE partnership_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE CASCADE,
    startup_partnerships BOOLEAN DEFAULT FALSE,
    enterprise_partnerships BOOLEAN DEFAULT FALSE,
    research_collaborations BOOLEAN DEFAULT FALSE,
    academic_partnerships BOOLEAN DEFAULT FALSE,
    government_contracts BOOLEAN DEFAULT FALSE,
    nonprofit_collaborations BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Innovation Focus Table
```sql
CREATE TABLE innovation_focus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE CASCADE,
    product_development BOOLEAN DEFAULT FALSE,
    process_innovation BOOLEAN DEFAULT FALSE,
    business_model_innovation BOOLEAN DEFAULT FALSE,
    sustainability_innovation BOOLEAN DEFAULT FALSE,
    social_impact BOOLEAN DEFAULT FALSE,
    disruptive_technology BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
POST   /api/auth/refresh           - Refresh JWT token
POST   /api/auth/forgot-password   - Send password reset email
POST   /api/auth/reset-password    - Reset password with token
GET    /api/auth/verify-email      - Verify email address
```

### Startup Profile Management
```
GET    /api/startup/profile                    - Get user's startup profile
POST   /api/startup/profile                    - Create new startup profile
PUT    /api/startup/profile                    - Update entire startup profile
DELETE /api/startup/profile                    - Delete startup profile
PATCH  /api/startup/profile/section/{section}  - Update specific section
GET    /api/startup/profile/completion         - Get profile completion status
```

### File Upload
```
POST   /api/startup/upload                     - Upload profile picture or company logo
DELETE /api/startup/upload/{fileId}            - Delete uploaded file
```

### Profile Sections (Individual endpoints for granular updates)
```
PATCH  /api/startup/profile/personal-info      - Update personal information
PATCH  /api/startup/profile/business-details   - Update business details
PATCH  /api/startup/profile/company-details    - Update company information
PATCH  /api/startup/profile/offerings          - Update company offerings
PATCH  /api/startup/profile/interests          - Update interests and focus areas
```

## API Response Formats

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

## Authentication & Authorization

### JWT Token Structure
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "iat": 1640995200,
  "exp": 1641081600,
  "type": "access"
}
```

### Protected Routes
- All `/api/startup/*` endpoints require valid JWT token
- Rate limiting: 100 requests per minute per user
- CORS configuration for frontend domain

## Validation Rules

### Personal Info
- `firstName`: Required, 2-50 characters
- `lastName`: Required, 2-50 characters
- `email`: Required, valid email format
- `phone`: Required, valid phone format
- `location`: Required, 2-100 characters

### Company Details
- `companyName`: Required, 2-100 characters
- `foundedYear`: Required, valid year (1900-current)
- `companyEmail`: Required, valid email format
- `companyDescription`: Required, 10-1000 characters
- `vision`: Required, 10-500 characters
- `mission`: Required, 10-500 characters

## File Upload Specifications

### Image Upload
- **Supported formats**: JPEG, PNG, WebP
- **Max file size**: 5MB
- **Image processing**: Resize to multiple sizes (150x150, 300x300, 600x600)
- **Storage**: AWS S3 with CloudFront CDN
- **Naming convention**: `{userId}/{type}/{timestamp}-{uuid}.{ext}`

### Security
- File type validation (magic number check)
- Malware scanning for uploaded files
- Signed URLs for temporary access

## Performance Requirements

### Response Times
- Authentication endpoints: < 200ms
- Profile CRUD operations: < 500ms
- File uploads: < 2s for 5MB files
- Search queries: < 300ms

### Scalability
- Support for 10,000+ concurrent users
- Database connection pooling
- Redis caching for frequently accessed data
- CDN for static assets

## Monitoring & Logging

### Metrics to Track
- API response times
- Error rates by endpoint
- User registration/login patterns
- Profile completion rates
- File upload success/failure rates

### Logging
- Structured JSON logging
- Log levels: ERROR, WARN, INFO, DEBUG
- Request/response logging for debugging
- Performance metrics logging

## Deployment & Infrastructure

### Environment Variables
```
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_URL=redis://host:port
JWT_SECRET=your-super-secret-key
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Docker Configuration
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## Security Considerations

### Data Protection
- Password hashing with bcrypt (cost factor 12)
- SQL injection prevention with parameterized queries
- XSS protection with input sanitization
- CSRF protection with tokens

### Privacy
- GDPR compliance for EU users
- Data retention policies
- User data export/deletion capabilities

## Testing Requirements

### Unit Tests
- 90%+ code coverage
- Test all API endpoints
- Mock external services

### Integration Tests
- Database operations
- File upload functionality
- Authentication flows

### Load Testing
- 1000 concurrent users
- Peak load scenarios
- Database performance under load

## API Rate Limiting

```
Global: 1000 requests/hour
Authentication: 10 requests/minute
File Upload: 20 uploads/hour
Profile Updates: 100 requests/hour
```

This comprehensive backend will support the frontend startup profile management system with robust data handling, security, and scalability features.


