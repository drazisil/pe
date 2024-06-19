init:
	pipenv install --dev

lint:
	pipenv run flake8 . --exit-zero

format:
	pipenv run black .


test:
	pipenv run coverage run -m pytest
	pipenv run coverage report -m --skip-covered
	pipenv run coverage xml

.PHONY: init lint test