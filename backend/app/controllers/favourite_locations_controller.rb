class FavouriteLocationsController < ApplicationController
  before_action :set_favourite_location, only: [:show, :update, :destroy]

  # GET /favourite_locations
  def index
    @favourite_locations = FavouriteLocation.all

    render json: @favourite_locations
  end

  # GET /favourite_locations/1
  def show
    render json: @favourite_location
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

  # PATCH/PUT /favourite_locations/1
  def update
    if @favourite_location.update(favourite_location_params)
      render json: @favourite_location
    else
      render json: @favourite_location.errors, status: :unprocessable_entity
    end
  end

  # DELETE /favourite_locations/1
  def destroy
    @favourite_location.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_favourite_location
      @favourite_location = FavouriteLocation.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def favourite_location_params
      params.require(:favourite_location).permit(:id, :user_id, :location_id)
    end
end
