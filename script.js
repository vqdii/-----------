<script>
        // Обработчик отправки формы
        document.getElementById('gameForm').onsubmit = function(event) {
            event.preventDefault(); // Останавливаем перезагрузку страницы

            // Получаем название игры из текстового поля
            const gameName = document.getElementById('gameName').value;

            // Создаём простой POST-запрос
            fetch('/get-laptops', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gameName: gameName })
            })
            .then(response => response.json()) // Преобразуем ответ в JSON
            .then(data => {
                const resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = ''; // Очищаем предыдущие результаты

                // Проверяем, есть ли подходящие ноутбуки
                if (data.laptops && data.laptops.length > 0) {
                    // Для каждого ноутбука создаём новый блок
                    data.laptops.forEach(laptop => {
                        const laptopDiv = document.createElement('div');
                        laptopDiv.className = 'laptop';
                        laptopDiv.textContent = laptop; // Добавляем текст с названием ноутбука
                        resultsDiv.appendChild(laptopDiv); // Вставляем блок в результаты
                    });
                } else {
                    // Если нет результатов, выводим сообщение
                    resultsDiv.textContent = 'Підходящих ноутбуків не знайдено.';
                }
            })
            .catch(() => {
                // Если произошла ошибка, выводим сообщение
                document.getElementById('results').textContent = 'Сталася помилка при пошуку ноутбуків.';
            });
        };
    </script>