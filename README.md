prosvcons
=========

Summary
-------
A tool to create lists and compare the pros and cons of your predicament. MEAN (MongoDB, Express, AngularJS, NodeJS)
stack + Stylus, Jade and Bootstrap


To do
-----
- For MVP:
    - User Auth:
        - LocalAuth - done
        - guest lists
            - viewable by all - done
            - editable by all
            - deletable by none
        - user lists
            - public lists
                - viewable by all - done
                - editable by only the creator
                - deletable by only the creator
            - private lists
                - viewable by only the creator - done
                - editable by only the creator
                - deletable by only the creator
        - login errors
        - signup errors

- Further enhancements:
    - Refactor the Angular controller to be more modular with directives.  Duplicate code for pros and cons is no good.
    - Refactor to have zero jquery
    - FacebookAuth
	- GoogleAuth
	- add error & loading indicator for Saving
    - add error & loading indicator for Updating
    - user lists
    	- public lists
    		- "allow others to edit" toggle