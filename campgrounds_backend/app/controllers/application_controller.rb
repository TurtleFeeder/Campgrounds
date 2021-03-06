class ApplicationController < ActionController::API
  before_action :authorized

  def encode_token(payload)
    # try implementing token expiration once i get a page that requires auth to access
    # payload[:expire] = (2).minutes.from_now.to_i # expires in 2 min
    JWT.encode(payload, ENV['TOKEN_SECRET'])
  end

  def auth_header
    # { 'Authorization': 'Bearer <token>' }
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, ENV['TOKEN_SECRET'], true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end # end decoded_token fn

  def current_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!current_user
  end

  def authorized
    render json: {message: 'Please log in'}, status: :unauthorized unless logged_in?
  end

end # end ApplicationController
