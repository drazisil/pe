init:
	pipenv install --dev

lint:
	# stop the build if there are Python syntax errors or undefined names
	pipenv run flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
	# exit-zero treats all errors as warnings. The GitHub editor is 127 chars wide
	pipenv run flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics


test:
	pipenv run coverage run -m pytest
	pipenv run coverage report -m --skip-covered
	pipenv run coverage xml

.PHONY: init lint test