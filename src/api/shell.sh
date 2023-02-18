#! /bin/bash

pipenv shell
flask test-users 50 && flask test-products 100