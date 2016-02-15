require 'bundler/gem_tasks'
require 'rspec/core/rake_task'

namespace :test do
  desc 'Run all tests'
  task all: [:node, :gem] do
    puts 'Finished all tests, yay!'
  end

  desc 'Run node package tests'
  task :node do
    sh %Q(npm test)
  end

  desc 'Run gem tests'
  task :gem do
    sh %Q(bundle exec rspec spec/rwr_alt.rb)
  end
end

task default: 'test:all'

namespace :setup do
  desc 'Prepare every environment'
  task all: [:node, :gem] do
    puts 'Prepared all, yay!'
  end

  desc 'Prepare node module dependencies'
  task :node do
    sh %Q(npm install)
  end

  desc 'Prepare gem dependencies'
  task :gem do
    sh %Q(bundle install)
  end
end
