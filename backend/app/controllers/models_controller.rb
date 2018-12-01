class ModelsController < ApplicationController
  def index
    models = Model.all.map { |model| model.as_json }
    render json: models, status: :ok
  end
end
