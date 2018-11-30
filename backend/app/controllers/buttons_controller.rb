class ButtonsController < ApplicationController
  def index
    buttons = Button.all.map { |button| button.as_json }
    render json: buttons, status: :ok
  end

  def create
    button = Button.new(button_params)

    if button.save!
      render json: button, status: :ok
    else
      render json: button.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def button_params
    params.require(:button).permit(:text, :colour_h, :colour_s, :colour_l, :width, :height, :position, :click_through_delta)
  end
end
