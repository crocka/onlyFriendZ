require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url, as: :json
    assert_response :success
  end

  test "should create user" do
    assert_difference('User.count') do
      post users_url, params: { user: { : @user., birthday: @user.birthday, email_address: @user.email_address, id: @user.id, image_url: @user.image_url, instagram_handle: @user.instagram_handle, name: @user.name, password: @user.password, password_confirmation: @user.password_confirmation, personal_link: @user.personal_link, summary: @user.summary, tiktok_handle: @user.tiktok_handle, twitter_handle: @user.twitter_handle } }, as: :json
    end

    assert_response 201
  end

  test "should show user" do
    get user_url(@user), as: :json
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { user: { : @user., birthday: @user.birthday, email_address: @user.email_address, id: @user.id, image_url: @user.image_url, instagram_handle: @user.instagram_handle, name: @user.name, password: @user.password, password_confirmation: @user.password_confirmation, personal_link: @user.personal_link, summary: @user.summary, tiktok_handle: @user.tiktok_handle, twitter_handle: @user.twitter_handle } }, as: :json
    assert_response 200
  end

  test "should destroy user" do
    assert_difference('User.count', -1) do
      delete user_url(@user), as: :json
    end

    assert_response 204
  end
end
