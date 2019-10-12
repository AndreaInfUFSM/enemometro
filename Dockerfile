FROM ubuntu:16.04
RUN apt-get update -qq && apt-get install sudo wget gcc make zlib1g-dev libssl-dev libmysqlclient-dev build-essential patch ruby-dev liblzma-dev -y
RUN wget http://ftp.ruby-lang.org/pub/ruby/2.6/ruby-2.6.3.tar.gz
RUN tar -xzvf ruby-2.6.3.tar.gz
WORKDIR /ruby-2.6.3
RUN ./configure
RUN make
RUN sudo make install
RUN mkdir /aplicacao
WORKDIR /aplicacao
COPY Gemfile /aplicacao/Gemfile
COPY Gemfile.lock /aplicacao/Gemfile.lock
RUN bundle install

