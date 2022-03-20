class UserReviewsController < ApplicationController
  before_action :set_user, only: [:show, :destroy]

  # GET /user_reviews/:id
  def  show
    @user_reviews = @user.user_reviews.all

    render json: @user_reviews
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

  # DELETE /user_reviews/:user_review_id
  def destroy
    @review = User.find(params[:user_review_id])
    @review.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_review_params
      params.require(:user_review).permit(:reviewer_id, :user_id, :comment)
    end
end
