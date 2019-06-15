FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY staged.zip /code/
RUN unzip staged.zip
RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y libasound-dev portaudio19-dev libportaudio2 libportaudiocpp0 nodejs
RUN pip install pipenv
RUN pipenv install --system
RUN ./build
