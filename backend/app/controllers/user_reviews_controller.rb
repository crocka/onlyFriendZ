class UserReviewsController < ApplicationController
  before_action :set_user_review, only: [:show, :update, :destroy]

  # GET /user_reviews
  def index
    @user_reviews = UserReview.all

    render json: @user_reviews
  end

  # GET /user_reviews/1
  def show
    render json: @user_review
  end

  # POST /user_reviews
  def create
    @user_review = UserReview.new(user_review_params)

    if @user_review.save
      render json: @user_review, status: :created, location: @user_review
    else
      render json: @user_review.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_reviews/1
  def update
    if @user_review.update(user_review_params)
      render json: @user_review
    else
      render json: @user_review.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_reviews/1
  def destroy
    @user_review.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_review
      @user_review = UserReview.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_review_params
      params.require(:user_review).permit(:id, :reviewer_id, :user_id, :comment)
    end
end
