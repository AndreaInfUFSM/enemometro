class HomeController < ApplicationController
    protect_from_forgery with: :null_session
    
    def index
        if params[:inic]
            @listacidades = Med2016Cidade.where('SG_UF_ESC = ?',params[:SG_UF_ESC]).order(:NO_MUNICIPIO_ESC).pluck(:NO_MUNICIPIO_ESC)
            render json: @listacidades
        end    
    end
    def postFunc
        if params[:ano] == '2016'
            @cidade = Med2016Cidade.where('NO_MUNICIPIO_ESC LIKE ? AND SG_UF_ESC = ?', params[:nocidade], params[:SG_UF_ESC]).take
            render json: @cidade
        elsif params[:ano] == '2017'
            @cidade = Med2017Cidade.where('NO_MUNICIPIO_ESC LIKE ? AND SG_UF_ESC = ?', params[:nocidade], params[:SG_UF_ESC]).take
            render json: @cidade
        elsif params[:ano] == '2018'
            @cidade = Med2018Cidade.where('NO_MUNICIPIO_ESC LIKE ? AND SG_UF_ESC = ?', params[:nocidade], params[:SG_UF_ESC]).take
            render json: @cidade
        elsif params[:ano] == '2013'
            @cidade = Med2013Cidade.where('NO_MUNICIPIO_ESC LIKE ? AND SG_UF_ESC = ?', params[:nocidade], params[:SG_UF_ESC]).take
            render json: @cidade
        elsif params[:ano] == '2014'
            @cidade = Med2014Cidade.where('NO_MUNICIPIO_ESC LIKE ? AND SG_UF_ESC = ?', params[:nocidade], params[:SG_UF_ESC]).take
            render json: @cidade
        elsif params[:ano] == '2015'
            @cidade = Med2015Cidade.where('NO_MUNICIPIO_ESC LIKE ? AND SG_UF_ESC = ?', params[:nocidade], params[:SG_UF_ESC]).take
            render json: @cidade
        elsif params[:tipo] == 'graph'
            vetor = []
            # Força de gambiarra2
            for i in 2013..2018
                @sql = ActiveRecord::Base.connection.exec_query("SELECT MED FROM med"+i.to_s+"_cidades WHERE NO_MUNICIPIO_ESC LIKE " + "'" + params[:nocidade] +  "'" + " AND SG_UF_ESC = " + "'" + params[:SG_UF_ESC] + "'" + " ").rows
                vetor.push([i.to_s, @sql[0][0]])
            end
            render json: vetor
        end
    end

end
