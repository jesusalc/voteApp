VoteApp



# run sample

MONGO_URL="mongodb://user:password@ds123456.mlab.com:12123/mongodbtablecollections" npm start


# Execute

Go to http://127.0.0.1:3000/routes to see routes descriptions

Go to http://127.0.0.1:3000/initializeCollections to load initial Sayings

Server would be Listening on http://127.0.0.1:3000


# Routes

  get home
  \,get init db
  \,get query name api/user
  \,get sayings/pete
  \,get query userId api/sayings
  \,post body rate user sayingId api/rateSaying
