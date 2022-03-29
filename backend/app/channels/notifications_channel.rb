class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notifications_channel"
    # byebug
  end

  def receive(data)

    ActionCable.server.broadcast('notifications_channel', { "#{data['user_id']}": "#{data['message']}" })

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
