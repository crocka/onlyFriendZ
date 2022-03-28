class UsersController < ApplicationController

  before_action :set_user, only: [:show, :update, :destroy, :images]

    # POST /users/images/:id
    def images

      if params[:images].present?
  
        # images = []

        # @user.images.attach(params[:images])
       
        params[:images].each do |params_image|
        
          # tempfile = Tempfile.new
          # tempfile.write(params_image)
          checksum = Digest::MD5.file(params_image.path).base64digest

          @user.images.each do |image|

            tempfile_user = Tempfile.new
            tempfile_user.write(image)
           
            checksum_user = Digest::MD5.file(tempfile_user.path).base64digest

            byebug
            
            if checksum_user == checksum

              byebug

              # image.purge_later

              tempfile.unlink

              tempfile_user.unlink

            else
              
              

              # images.push(rails_blob_path(params_image, only_path:true))

            end
          
          end

          @user.images.attach(params[:images])

        end
  
      end
  
 
  
      @user.images.each do |image|
        
      end
  
      render json: { 
        
        location: @user, 
        images: images
  
      }
    
  end

  # GET /users
  def index
    @users = User.all

    render json: @users
  
  end

  # GET /users/1
  def show

    images = []

    @user.images.each do |image|
      images.push(rails_blob_path(image, only_path: true))
    end

    render json: {
      
      user: @user, 
      images: images

    }
    
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
