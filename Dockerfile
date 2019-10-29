FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
RUN mkdir -p /srv/www/pi-wall-project/static
WORKDIR /code

COPY staged.zip /code/
RUN unzip staged.zip

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y libasound-dev portaudio19-dev libportaudio2 libportaudiocpp0 nodejs
RUN pip install pipenv
RUN pipenv install --system

EXPOSE 8000

# build the frontend apps
RUN ./build

CMD ["gunicorn", "--chdir", "pi_wall_project", "--bind", ":8000", "pi_wall_project.wsgi:application"]
