FROM python:3.11.9

WORKDIR /src/backend

RUN python -m pip install Django
RUN python -m pip install django-cors-headers

COPY ./ ./

EXPOSE 8000

CMD python manage.py runserver 0.0.0.0:8000