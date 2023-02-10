source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 4.2.0"

# This is the default theme for new Jekyll sites. You may change this to anything you like.
# gem "minima", "~> 2.0"

# gem "jekyll-seo-tag", ">= 2.4.0"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  # MASTER PLUGINS
  # gem "jekyll-feed", "~> 0.6"
  gem "jekyll-paginate-v2"
  gem "jekyll-liquify"
  # PROJECT PLUGINS
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?

# Required for Apple silicon
gem "webrick", "~> 1.7"

# Fix x86_64 / arm64e error
# /Users/ian/.rbenv/versions/3.0.0/lib/ruby/gems/3.0.0/gems/redcarpet-3.6.0/lib/redcarpet.rb:1:in `require': dlopen(/Users/ian/.rbenv/versions/3.0.0/lib/ruby/gems/3.0.0/gems/redcarpet-3.6.0/lib/redcarpet.bundle, 0x0009): tried: '/Users/ian/.rbenv/versions/3.0.0/lib/ruby/gems/3.0.0/gems/redcarpet-3.6.0/lib/redcarpet.bundle' (mach-o file, but is an incompatible architecture (have (x86_64), need (arm64e))) - /Users/ian/.rbenv/versions/3.0.0/lib/ruby/gems/3.0.0/gems/redcarpet-3.6.0/lib/redcarpet.bundle (LoadError)
gem "redcarpet", "~> 3.5.1"
