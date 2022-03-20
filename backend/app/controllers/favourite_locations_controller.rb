class FavouriteLocationsController < ApplicationController
  before_action :set_user, only: [:show]

  # GET /favourite_locations/:id
  def show
    @favourite_locations = @user.favourite_locations.all

    render json: @favourite_locations
  end



  # POST /favourite_locations
  def create
    @favourite_location = FavouriteLocation.new(favourite_location_params)

    if @favourite_location.save
      render json: @favourite_location, status: :created, location: @favourite_location
    else
      render json: @favourite_location.errors, status: :unprocessable_entity
    end
  end

  # DELETE /favourite_locations/:id
  def destroy
    @userFavoriteLocation = FavouriteLocation.find(params[:id])
    @userFavoriteLocation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def favourite_location_params
      params.require(:favourite_location).permit(:user_id, :location_id)
    end
end
