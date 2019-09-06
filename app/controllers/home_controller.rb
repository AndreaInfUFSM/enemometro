class HomeController < ApplicationController
    protect_from_forgery with: :null_session
    def index
        if params[:inic]
            @listacidades = Med2016Cidade.where('SG_UF_ESC = ?',params[:SG_UF_ESC]).order(:NO_MUNICIPIO_ESC).pluck(:NO_MUNICIPIO_ESC)
            render json: @listacidades
        end    
    end
    def showCity
        @cidade = Med2016Cidade.where('NO_MUNICIPIO_ESC LIKE ? AND SG_UF_ESC = ?', params[:nocidade], params[:SG_UF_ESC]).take
        render json: @cidade
    end

end
