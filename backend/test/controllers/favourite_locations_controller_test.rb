require 'test_helper'

class FavouriteLocationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @favourite_location = favourite_locations(:one)
  end

  test "should get index" do
    get favourite_locations_url, as: :json
    assert_response :success
  end

  test "should create favourite_location" do
    assert_difference('FavouriteLocation.count') do
      post favourite_locations_url, params: { favourite_location: { id: @favourite_location.id, location_id: @favourite_location.location_id, user_id: @favourite_location.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show favourite_location" do
    get favourite_location_url(@favourite_location), as: :json
    assert_response :success
  end

  test "should update favourite_location" do
    patch favourite_location_url(@favourite_location), params: { favourite_location: { id: @favourite_location.id, location_id: @favourite_location.location_id, user_id: @favourite_location.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy favourite_location" do
    assert_difference('FavouriteLocation.count', -1) do
      delete favourite_location_url(@favourite_location), as: :json
    end

    assert_response 204
  end
end
