verbose.chat
============
A chat platform

Getting started
---------------

The commands listed assume you're in the top directory of the repository.

Prerequisites:

  - python3
  - pip
  - node.js
  - yarn

Initialize:

	# install python dependencies
    pip install -r requirements.txt
	# install nodejs dependencies
	yarn

Build the frontend:

	# places outputs in ./backend/static/
    yarn webpack

Run a development server:

	./backend/manage.py runserver

Run with uwsgi and nginx:

	# TODO: add a configuration file that can be dropped into sites-enabled
