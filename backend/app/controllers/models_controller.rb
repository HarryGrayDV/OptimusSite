class ModelsController < ApplicationController
  def mobile
    mobile_models = Model.mobile.map { |mobile_model| mobile_model.as_json }
    render json: mobile_models, status: :ok
  end

  def web
    web_models = Model.web.map { |web_model| web_model.as_json }
    render json: web_models, status: :ok
  end
end
