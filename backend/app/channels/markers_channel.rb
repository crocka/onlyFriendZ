class MarkersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "markers_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
