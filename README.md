## Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### Backend
```bash
cd server
npm install
#.env file with DATABASE_URL
npm start
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Tradeoffs

- **PostgreSQL**: Better scalability v. SQL simplicity
- **React + TypeScript**: Type safety v. learning curve
- **Tailwind CSS**: Fast development v. bundle size

## Future Improvements

### Short-term
- User authentication
- Email notifications

### Long-term
- Analytics dashboard
- Performance optimization