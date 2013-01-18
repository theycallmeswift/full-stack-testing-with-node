require 'sinatra'
require 'json'

set :public_folder, File.dirname(__FILE__) + '/public'

users = [
  { id: 1, name: "Swift", twitter: "SwiftAlphaOne", gravatar: "10831877bd394c902f1dda20524c86d6", job: "Developer Evangelist" },
  { id: 2, name: "Ian", twitter: "Sw1tch", gravatar: "ed48583f593bd0bf96393d73f40ce6cf", job: "Freelancer" },
  { id: 3, name: "Abe", twitter: "AbeStanway", gravatar: "6601d82cf1b6776afd9c31f3d18294c3", job: "Ops" }
]

get '/' do
  erb :index
end

get '/api/users' do
  content_type :json
  users.to_json
end

post '/api/users' do
  content_type :json

  request.body.rewind
  data = JSON.parse request.body.read
  if users.count > 0
    id = users.last[:id] + 1
  else
    id = 1
  end

  users << { id: id, name: data['name'], twitter: data['twitter'], gravatar: data['gravatar'], job: data['job'] }

  { status: "OK" }.to_json
end

post '/api/users/:id' do
  content_type :json

  users.reject! { |user| user[:id] == params[:id].to_i }

  { status: "OK" }.to_json
end
