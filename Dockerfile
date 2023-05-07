FROM reactnativecommunity/react-native-android:2.1
# set locale to utf8 for fastlane
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
# install bundler
RUN gem install bundler