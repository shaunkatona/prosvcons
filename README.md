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
- add a public/private flag on lists
- public users can't hack URL to view/edit/update anything
- only correct users can hack URL to view/edit/update anything

- For MVP:
    - User Auth:
        - LocalAuth - done
        - guest lists - done
            - viewable by all - done
            - editable by all - done
            - deletable by none - done
            - share with anyone via the URL - done
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

- Further enhancements:
    - Refactor the Angular controller to be more modular with directives.  Duplicate code for pros and cons is no good.
    - Refactor to have zero jquery
    - FacebookAuth
	- GoogleAuth
	- add error & loading indicator for Saving
    - add error & loading indicator for Updating