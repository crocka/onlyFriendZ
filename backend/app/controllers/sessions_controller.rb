class SessionsController < ApplicationController
  
  def create
    user = User.find_by_email_address(params[:email_address])
    # If the user exists AND the password entered is correct.
    if user = User.authenticate_with_credentials(params[:email_address], params[:password])
      # Save the user id inside the browser cookie. This is how we keep the user 
      # logged in when they navigate around our website.
      session[:user_id] = user.id
      render json: session
    else
    # If user's login doesn't work, send them back to the login form.
      redirect_to root_url
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end

end
