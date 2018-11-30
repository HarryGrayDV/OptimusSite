source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

# Core
gem 'rails', '~> 5.2.1', '>= 5.2.1.1'
gem 'puma', '~> 3.11'
#  To handle business logic and great for refactoring
gem "interactor", "~> 3.0"

# Database
gem 'pg', '>= 0.18', '< 2.0'

# Handling CORS
gem 'rack-cors'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # we would use rspec for testing
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
