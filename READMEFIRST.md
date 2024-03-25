BookMyRoom app features to explore.
<!-- Run the App -->
A. FrontEnd -       From the root folder type these in terminal
    1.  cd frontend
    2.  npm i
    3.  npm run dev 
    // Then direct to localhost:5173 oon your browser
B. Backend -        From the root folder type these in different terminal (split the terminal)
    1.  cd backend
    2.  npm i   
    3.  nodemon
    // server is hosted in localhose:5000
Done..


<!-- Normal user -->
1. Landing page
'/'     -To get statrted
2. Home page
'/home' -Contains 1. nav bar, 2. Search bar, 3. displaying all rooms
3. Nav bar 
    buttons linking to different pages
    *without login
    -home
    -login
    -register
    -BookMyRoom         -landing page
    *logged in user
    -Dropdown- user name, myaccount, logout btns
4.Search bar    -it has 3 filters. 
    1.Date range filter 
    -Without selecting dates you can't see 'Book now' btn in each room.
    -it filter outs available rooms in the selected date range. Doesn't display already booked rooms in the selected date range.
    2.filter out by room name
    3.filter out by room type -deluxe or non deluxe
5.Home page room tab-
    -Booknow btn to book room. (available if logged in)
    -view details btn to view. (available for everyone)
6.Booking page (click on booknow btn  )
    -review booking details
    -Pay now btn to pay through 'stripe'
7. Stripe paymentgateway integration
    -paynow btn leads to payment CARD details (i.e. use '4242 4242 4242 4242' -visaCard)
    -Confirmation alert box 'Success ' or 'Failure' of payment
    -Boking is saved in db , you can see it in myAccount=> my bookings
8. My account from nav bar (current -only read, no update option)
    -my account -to see your profile
    -my bookings- to see your all bookings
9. Authorisation & Authentication
    -Register
    -login
    -Many protected routes

<!-- Admin user -->
first login with admin user credentials to see further
    email-      shiva@mail.com
    password-   123456
ther are four tabs in this section. Every data is fetched from DATABASE hosted in mongodb Atlas cluster.
1.Rooms     -Admin can see all registered rooms 
2.Add Rooms -Admin can add Rooms, to verify go to home page and find your new added room. Confirmation alert.
3.Bookings  -Admin can see total bookings with details.1
4.User      -Admin can see all users registered in App.

<!-- Others -->
-Used MongoDB database on Atlas cluster
-Three collections to collect 
    1.Bookings
    2.Rooms
    3.Users

<!-- Learnings/Skills/TYechnologies  -->
-React
-Node.js
-Express
-nodemon    -for server side hot reloading
-Mongodb , mongoose
-Github     -everything is pushed to github step by step as i proceed in project
-Tailwind css   -for styling
-React router
-React-stripe & stripe  -for payment
-uuid   -for generating new user id everytime
-Axios  -for Fetching data from Database (user, room. bokings etc) 
-postman    -to verify api requests/response








