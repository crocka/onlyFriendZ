class MarkersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "markers_channel"

    @user = User.find_by(id: params[:user_id])

    ActionCable.server.broadcast('markers_channel', { "#{params[:user_id]}": params[:position] })
  end

  def receive(data)

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end