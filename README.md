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
        - guest lists
            - viewable by all - DONE
            - editable by all - DONE
            - always show edit button
            - deletable by none
            - never show delete button
        - user lists
            - public lists
                - viewable by all - DONE
                - editable by only the creator - DONE
                - only show edit button to creator
                - deletable by only the creator
                - only show delete button to creator
            - private lists
                - viewable by only the creator - DONE
                - editable by only the creator - DONE
                - only show edit button to creator
                - deletable by only the creator
                - only show delete button to creator
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