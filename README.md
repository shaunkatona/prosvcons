prosvcons
=========

Summary
-------
A tool to create lists and compare the pros and cons of your predicament. MEAN (MongoDB, Express, AngularJS, NodeJS)
stack + Stylus, Jade and Bootstrap


To do
-----
- For MVP:
    - Fill out Contact page
    - Fill out About page
    - Make a FAQ/Help page?
    - Add a Delete button next to Save, to delete saved lists
    - Private Github account? (db passwords, hosts)
- Further enhancements:
    - User creation/authentication so everyone has their own lists
    - Refactor the Angular controller to be more modular.  Duplicate code for pros and cons is no good.
    - Refactor to have zero jquery
    - User Auth:
        - guest lists
            - editable/viewable by all
            - get deleted 30 days after the last view
        - public lists
            - can be viewed by anyone/guest
            - add a "editable by all" toggle
            - share button
        - private lists
            - can only be viewed by "you"
            - can only be deleted by "you"
            - can only be edited by "you"