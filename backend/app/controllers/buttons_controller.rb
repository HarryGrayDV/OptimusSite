class ButtonsController < ApplicationController
  def index
    buttons = Button.all.map { |button| button.as_json }
    render json: buttons, status: :ok
  end

  def create
    button = Button.new(button_params)

    if button.save!
      render json: button, status: :created
    else
      render json: button.errors.messages, status: :unprocessable_entity
    end
  end

  private

  def button_params
    params.require(:button).permit(:position, :text, :mobile, :age, :gender, :region, :ctd, :synthetic)
  end
end
