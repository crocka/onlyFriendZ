class MarkersChannel < ApplicationCable::Channel
  
  # @positions={}

  def subscribed
    stream_from "markers_channel"

    @user = User.find_by(id: params[:user_id])

    # @positions[:"#{params[:user_id]}"] = params[:position] 
    
    
    ActionCable.server.broadcast('markers_channel', { "#{params[:user_id]}": params[:position] })
  end

  def receive(data)

    # @positions[:"#{data['user_id']}"] = data['position'];

    # byebug

    ActionCable.server.broadcast('markers_channel', { "#{data['user_id']}": data['position'] })

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
