FROM ruby:2.5-alpine

RUN apk update && apk upgrade && apk add ruby ruby-json ruby-io-console ruby-bundler ruby-irb ruby-bigdecimal tzdata postgresql-dev && apk add nodejs && apk add curl-dev ruby-dev build-base libffi-dev && apk add build-base libxslt-dev libxml2-dev ruby-rdoc mysql-dev sqlite-dev bash libc6-compat openssh wget git

RUN ln -s /lib64/ld-linux-x86-64.so.2

RUN mkdir /appl
WORKDIR /appl

RUN git clone https://github.com/wdsoares/enemometro.git .
RUN bundle install

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]
