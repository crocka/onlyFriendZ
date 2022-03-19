require 'test_helper'

class UserReviewsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_review = user_reviews(:one)
  end

  test "should get index" do
    get user_reviews_url, as: :json
    assert_response :success
  end

  test "should create user_review" do
    assert_difference('UserReview.count') do
      post user_reviews_url, params: { user_review: { comment: @user_review.comment, id: @user_review.id, reviewer_id: @user_review.reviewer_id, user_id: @user_review.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show user_review" do
    get user_review_url(@user_review), as: :json
    assert_response :success
  end

  test "should update user_review" do
    patch user_review_url(@user_review), params: { user_review: { comment: @user_review.comment, id: @user_review.id, reviewer_id: @user_review.reviewer_id, user_id: @user_review.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy user_review" do
    assert_difference('UserReview.count', -1) do
      delete user_review_url(@user_review), as: :json
    end

    assert_response 204
  end
end
