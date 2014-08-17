prosvcons
=========

Summary
-------
A tool to create lists and compare the pros and cons of your predicament. MEAN (MongoDB, Express, AngularJS, NodeJS)
stack + Stylus, Jade and Bootstrap


To do
-----
- incorrect username/password message
- email already exists message
- add createDate and lastLoginDate to user.js
    - update those when logging in and signing up
- add a createDate to lists
- add a userID to lists


- For MVP:
    - User Auth:
        - LocalAuth
        - FacebookAuth
        - GoogleAuth
        - if logged in add a Welcome, <name>! next to My Lists dropdown
            - and a log out button
        - if not logged in
            - no My Lists dropdown
        - guest lists
            - viewable by all
            - editable by all
            - deletable by none
            - share with anyone via the URL
        - user lists
            - public lists
                - viewable by all
                - editable by only the user
                - deletable by only the user
                - share with anyone via the URL
                - allow others to edit toggle
                    - editable by anyone
            - private lists
                - viewable by only the user
                - editable by only the user
                - deletable by only the user
                - there is no edit toggle for other users
    - add error indicator for Saving
    - add error indicator for Updating
- Further enhancements:
    - Refactor the Angular controller to be more modular with directives.  Duplicate code for pros and cons is no good.
    - Refactor to have zero jquery
    - change list db to use mongoose