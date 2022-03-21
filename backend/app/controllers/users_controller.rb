class UsersController < ApplicationController

  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: { 
      
      user: @users
    
    
    }
  
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    # @user.name = "#{user_params[:firstName]} #{user_params[:lastName]}"
    
    if @user.save
      session[:user_id] = @user.id
      
      if params[:images].present?

        # params[:user][:images].each do |image|
          @user.images.attach(params[:images])
        # end

      end

      byebug
      
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.permit(:name, :email_address, :password, :password_confirmation, :birthday, :instagram_handle, :twitter_handle, :tiktok_handle, :personal_link, :summary)

    end
end
