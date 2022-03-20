class CommentsController < ApplicationController
  before_action :set_location, only: [:show]

  # GET /comments
  def index
  
    @comments = Comment.all

    render json: @comments
    
  end

  # GET /comments/:id
  def show
    @comments = @location.comments.all

    render json: @comments
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @location_comment = Comment.find(params[:id])
    @location_comment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = Location.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.require(:comment).permit(:user_id, :location_id, :rating, :comment)
    end
end
