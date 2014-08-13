prosvcons
=========

Summary
-------
A tool to create lists and compare the pros and cons of your predicament. MEAN (MongoDB, Express, AngularJS, NodeJS)
stack + Stylus, Jade and Bootstrap


To do
-----
- For MVP:
    - add loading indicator for Saving
    - remove dropdown list of "my lists"
- Further enhancements:
    - Refactor the Angular controller to be more modular.  Duplicate code for pros and cons is no good.
    - Refactor to have zero jquery
    - User Auth:
        - guest lists
            - editable/viewable by all
        - public lists
            - can be viewed by anyone/guest
            - add a "allow others to edit" toggle for the creator
            - share button
        - private lists
            - can only be viewed by "you"
            - can only be deleted by "you"
            - can only be edited by "you"