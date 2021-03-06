class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :update, :images]

  # POST /locations/images/:id
  def images

    if params[:images].present?

      @location.images.attach(params[:images])

    end

    images = []

    @location.images.each do |image|
      images.push(rails_blob_path(image, only_path:true))
    end

    render json: { 
      
      location: @location, 
      images: images

    }
  
  end

  # GET /locations
  def index
    @locations = Location.all

    render json: @locations
  end

  # GET /locations/1
  def show

    images = []

    @location.images.each do |image|
      images.push(rails_blob_path(image, only_path:true))
    end

    render json: { 
      
      location: @location, 
      images: images

    }
  end

  # POST /locations
  def create
    @location = Location.new(location_params)

    if @location.save
      
      if params[:images].present?

          @location.images.attach(params[:images])

      end
      
      render json: @location, status: :created, location: @location
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /locations/1
  def update
    if @location.update(location_params)
      render json: @location
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  # DELETE /locations/1
  def destroy
    @location.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = Location.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def location_params
      params.permit(:title, :description, :latitude, :longitude, :is_dangerous)
    end
end
