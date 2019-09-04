# ---------- SCRIPT PROCESSAMENTO DE MICRODADOS ENEM, Nº 2 -----------
#
# Autor: Willian D. Soares - Universidade Federal de Santa Maria
# Objetivo: Adicionar nomes das escolas ao CSV pré-processado a partir do CSV
#           fornecido pelo EDUCACENSO do ano correspondente

# How-to: Insira este script no mesmo diretório do CSV e altere os campos necessários

setwd("/home/wsoares/Documentos/Microdados/")
Sys.setlocale("LC_ALL", "C")

transactFile <- "ESCOLAS.CSV"
chunkSize <- 2000
index <- 0
con <- file(description= transactFile, open="r")   
data <- read.csv(con, nrows=chunkSize, header=F, skip = 1, fill=TRUE, sep="|", stringsAsFactors = TRUE, fileEncoding = "latin1")
descolas <- c()
descolas <- rbind(descolas, subset(data, select = c(2,3,12)))
Sys.setlocale("LC_ALL", "C")

print("Passo 1: Criando novo dataset contendo somente colunas necessárias")
repeat {
  index <- index + 1
  print(paste('Processando linhas:', index * chunkSize))
  
  if (nrow(data) != chunkSize){
    print('Concluído!')
    break}
  
  
  data <- read.csv(con, nrows=chunkSize, skip=0, header=FALSE, fill = TRUE, as.is = T, sep="|", stringsAsFactors = TRUE, fileEncoding = "latin1")
  
  # ALTERAR CONFORME O ANO DO CSV A SER LIDO
  descolas <- rbind(descolas, subset(data, select = c(2,3,12)))
}
close(con)
colnames(descolas) <- c("CO_ENTIDADE", "NO_ENTIDADE", "CO_MUNICIPIO")

dAno <- read.csv("2016_escola.csv", header = T)
dAno$NO_ESCOLA <- NA
dAno$NO_ESCOLA <- as.character(dAno$NO_ESCOLA)

for(i in 1:nrow(dAno))
{
  if(length(descolas[which(descolas$CO_ENTIDADE == dAno[i, ]$CO_ESCOLA),]$NO_ENTIDADE) > 0)
  {
    dAno[i, ]$NO_ESCOLA <- as.character(descolas[which(descolas$CO_ENTIDADE == dAno[i, ]$CO_ESCOLA),]$NO_ENTIDADE)
  }
  else
  {
    dAno[i, ]$NO_ESCOLA <- NA
  }
}

write.csv(dAno, file = "2016_escolas_final.csv", row.names = F, quote = F, eol = "\r")
