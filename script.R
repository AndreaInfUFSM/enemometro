# ---------- SCRIPT PROCESSAMENTO DE MICRODADOS ENEM -----------
#
# Autor: Willian D. Soares - Universidade Federal de Santa Maria
# Justificativa: Ler e manusear microdados do ENEM fornecidos pelo INEP
#                em computadores com pouca memória primária

# How-to: Insira este script no mesmo diretório do CSV e altere os campos necessários

setwd("/home/wsoares/Documentos/Microdados/")
library(data.table)
library(dplyr)

# Inicia a leitura do CSV
transactFile <- "microdados_enem_2016.csv"
chunkSize <- 25000
index <- 0
con <- file(description= transactFile, open="r")   
data <- read.csv(con, nrows=chunkSize, header=FALSE, skip = 1, fill=TRUE, sep=";", stringsAsFactors = FALSE, fileEncoding = "latin1")

dfinal <- c()
dfinal <- rbind(dfinal,subset(data, select = c(21,22,23,25,97,98,99,100,116)))
Sys.setlocale("LC_ALL", "C")
print("Passo 1: Criando novo dataset contendo somente colunas necessárias")
repeat {
  index <- index + 1
  print(paste('Processando linhas:', index * chunkSize))
  
  if (nrow(data) != chunkSize){
    print('Concluído!')
    break}
  
  
  data <- read.csv(con, nrows=chunkSize, skip=0, header=FALSE, fill = TRUE, as.is = T, sep=";", stringsAsFactors = FALSE, fileEncoding = "latin1")
  
  # ALTERAR CONFORME O ANO DO CSV A SER LIDO
  # Colunas necessárias (EM ORDEM): CO_ESCOLA, CO_MUNICIPIO_ESC, NO_MUNICIPIO_ESC
  # SG_UF_ESC, NU_NOTA_CN, NU_NOTA_CH, NU_NOTA_LC, NU_NOTA_MT, NU_NOTA_REDACAO
  
  # Dica: Leia um único registro do arquivo com f <- read.csv("arquivo.csv", sep = ";", 
  #                                                            nrows = 1, header = T)
  #       para obter os nomes das colunas correspondentes, visualize com colnames(f)

  dfinal <- rbind(dfinal, subset(data,select = c(21,22,23,25,97,98,99,100,116)))
}
close(con)

colnames(dfinal) = c("CO_ESCOLA", "CO_MUNICIPIO_ESC", "NO_MUNICIPIO_ESC", 
                     "SG_UF_ESC", "NU_NOTA_CN", "NU_NOTA_CH", "NU_NOTA_LC",
                     "NU_NOTA_MT", "NU_NOTA_REDACAO")

# Remove registros sem código de cidade
dfinal <- dplyr::filter(dfinal, !is.na(CO_MUNICIPIO_ESC))

# Remove registros sem notas
dfinal <- dplyr::filter(dfinal, (!is.na(NU_NOTA_CN) & 
                                 !is.na(NU_NOTA_CH) & 
                                 !is.na(NU_NOTA_CN) & 
                                 !is.na(NU_NOTA_LC) & 
                                 !is.na(NU_NOTA_MT) & 
                                 !is.na(NU_NOTA_REDACAO)))

# Adiciona o campo média
dfinal["MED"] <- NA
print("Passo 2: Calculando as médias para cada aluno")

##########################################################################################################
# Calcula a média por escola

##########################
# Calcula a média de cada aluno
for(i in 1:nrow(dfinal))
{
  vetor <- c(dfinal[i,"NU_NOTA_CN"], dfinal[i,"NU_NOTA_CH"], dfinal[i,"NU_NOTA_LC"], dfinal[i,"NU_NOTA_MT"], dfinal[i,"NU_NOTA_REDACAO"])
  dfinal[i,"MED"] <- mean(vetor)
}

mediaframe <- data.frame( "CO_ESCOLA" = integer(0), "CO_MUNICIPIO_ESC" = integer(0), 
                          "NO_MUNICIPIO_ESC" = character(0),"SG_UF_ESC" = character(0), 
                          "MED" = integer(0), stringsAsFactors = F)

mediaframe$NO_MUNICIPIO_ESC <- as.character(mediaframe$NO_MUNICIPIO_ESC)
mediaframe$SG_UF_ESC <- as.character(mediaframe$SG_UF_ESC)

#########################
# Cria data frame com os códigos distintos de cada escola 

co_dist <- dfinal %>% distinct(CO_ESCOLA)
print("Passo 3: Calculando média para escolas")
#########################
# Para cada código único, seleciona todos os alunos, calcula a média e adiciona no data frame final
for(i in 1: nrow(co_dist))
{
  t <- dfinal[which(dfinal$CO_ESCOLA == co_dist[i,]),]
  if(nrow(t) > 0)
  {
    med <- mean(t$MED)
    med <- round(med,2)
    mediaframe[nrow(mediaframe) + 1,] <- c(co_dist[i,],t[1,]$CO_MUNICIPIO_ESC,
                                           as.character(t[1,]$NO_MUNICIPIO_ESC), 
                                           as.character(t[1,]$SG_UF_ESC), med)
  }
}
########################
# Escreve resultados por ESCOLA em csv
# ALTERE O NOME DO ARQUIVO ABAIXO
write.csv(mediaframe, file = "2016_escola.csv", quote = F, eol = "\r", row.names = F)
print("Salvo! Média das escolas calculadas e armazenadas em CSV")

##########################################################################################################
# Calcula a média por cidade
print("Passo 4: Calculando média por cidade")

mediaframe <- data.frame( "CO_MUNICIPIO_ESC" = integer(0), "NO_MUNICIPIO_ESC" = character(0),
                          "SG_UF_ESC" = character(0), "MED" = integer(0), 
                          stringsAsFactors = F)
mediaframe$NO_MUNICIPIO_ESC <- as.character(mediaframe$NO_MUNICIPIO_ESC)
mediaframe$SG_UF_ESC <- as.character(mediaframe$SG_UF_ESC)

co_dist <- dfinal %>% distinct(CO_MUNICIPIO_ESC)
for(i in 1: nrow(co_dist))
{
  t <- dfinal[which(dfinal$CO_MUNICIPIO_ESC == co_dist[i,]),]
  if(nrow(t) > 0)
  {
    med <- mean(t$MED)
    med <- round(med,2)
    mediaframe[nrow(mediaframe) + 1,] <- c(co_dist[i,], 
                                           as.character(t[1,]$NO_MUNICIPIO_ESC), 
                                           as.character(t[1,]$SG_UF_ESC), 
                                           med)
  }
}
# Escreve resultados por CIDADE em csv
# ALTERE O NOME DO ARQUIVO ABAIXO
write.csv(mediaframe, file = "2016_cidade.csv", quote = F, eol = "\r", row.names = F)
print("Salvo! Média das cidades calculadas e armazenadas em CSV")
print("------ Script finalizado! -------")
#########################################################################################################