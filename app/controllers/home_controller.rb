class HomeController < ApplicationController
    protect_from_forgery with: :null_session
    
    def index
        if params[:cid]
            @listacidades = Med2015Cidade.where('SG_UF_ESC = ?',params[:SG_UF_ESC]).order(:NO_MUNICIPIO_ESC).pluck(:NO_MUNICIPIO_ESC)
            render json: @listacidades
        elsif params[:esc]
            @listaescolas = Med2015Escola.where('SG_UF_ESC = ? AND NO_MUNICIPIO_ESC LIKE ?',params[:SG_UF_ESC], params[:NO_MUNICIPIO_ESC]).order(:NO_ESCOLA).pluck(:NO_ESCOLA)
            render json: @listaescolas
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
        
        # Força de gambiarra
        elsif params[:tipo].to_s == 'graphCidade'
            vetor = []
            for i in 2013..2018
                @sql = ActiveRecord::Base.connection.exec_query("SELECT MED FROM med"+i.to_s+"_cidades WHERE NO_MUNICIPIO_ESC LIKE " + "'" + params[:nocidade1] +  "'" + " AND SG_UF_ESC = " + "'" + params[:SG_UF_ESC1] + "'" + " ").rows
                @sql2 = ActiveRecord::Base.connection.exec_query("SELECT MED FROM med"+i.to_s+"_cidades WHERE NO_MUNICIPIO_ESC LIKE " + "'" + params[:nocidade2] +  "'" + " AND SG_UF_ESC = " + "'" + params[:SG_UF_ESC2] + "'" + " ").rows
                if @sql.count > 0 && @sql2.count > 0
                    vetor.push([i.to_s, @sql[0][0], @sql2[0][0]])
                else
                    render js: "alert('Cidade não encontrada, verifique o nome das cidades informadas!')" and return
                end
            end
            render json: vetor
        elsif params[:tipo].to_s == 'graphEscolaCidade'
            vetor = []
            for i in 2013..2018
                @sql = ActiveRecord::Base.connection.exec_query("SELECT MED FROM med"+i.to_s+"_cidades WHERE NO_MUNICIPIO_ESC LIKE " + "'" + params[:nocidade2] +  "'" + " AND SG_UF_ESC = " + "'" + params[:SG_UF_ESC2] + "'" + " ").rows
                @sql2 = ActiveRecord::Base.connection.exec_query("SELECT MED FROM med"+i.to_s+"_escolas WHERE NO_ESCOLA LIKE " + "'" + params[:NO_ESCOLA] + "'" + " AND NO_MUNICIPIO_ESC LIKE " + "'" + params[:nocidade1] +  "'" + " AND SG_UF_ESC = " + "'" + params[:SG_UF_ESC1] + "'" + " ").rows
                if @sql.count > 0 && @sql2.count > 0
                    vetor.push([i.to_s, @sql[0][0], @sql2[0][0]])
                else
                    render js: "alert('Cidade não encontrada, verifique o nome das cidades informadas!')" and return
                end
            end
            render json: vetor
        end
    end
end
