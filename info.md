# Bookmarks

## 🔹 1. Zugriff auf HTML-Elemente

```js
const addBookmarkBtn = document.getElementById('add-bookmark');
const bookmarkList = document.getElementById('bookmark-list');
const bookmarkNameInput = document.getElementById('bookmark-name');
const bookmarkUrlInput = document.getElementById('bookmark-url');
```

👉 Hier werden Elemente aus dem HTML geholt:

Zu Beginn werden mehrere Elemente aus dem HTML geholt.  
Ein Button mit der ID `add-bookmark` wird ausgewählt und einer Variable zugewiesen, damit man später darauf reagieren kann.  
Genauso wird eine Liste mit der ID `bookmark-list` geholt, in der die Bookmarks angezeigt werden sollen.  
Zusätzlich werden zwei Eingabefelder geholt: eines für den Namen (`bookmark-name`) und eines für die URL (`bookmark-url`).

## 🔹 2. Beim Laden der Seite

```js
document.addEventListener('DOMContentLoaded', loadBookmarks);
```

🔍 Was passiert hier?

- document → das gesamte HTML-Dokument
- addEventListener(...) → „höre auf ein bestimmtes Ereignis“
- 'DOMContentLoaded' → Ereignis:
  - 👉 Das HTML ist komplett geladen und aufgebaut
  - loadBookmarks → Funktion, die dann ausgeführt wird

🧠 Wichtig zu verstehen - 👉 DOMContentLoaded heißt:

HTML ist fertig geladen ✅ aber z. B. Bilder oder CSS evtl. noch nicht vollständig ❗

## Unterschied zwischen DOMContentLoaded und window.onload

- `DOMContentLoaded` wird ausgelöst, sobald das HTML vollständig geladen und als Struktur im Browser aufgebaut ist.  
  Das bedeutet, dass alle Elemente bereits im DOM vorhanden sind und mit JavaScript angesprochen werden können.

- `window.onload` wird erst ausgelöst, wenn wirklich alles geladen ist, also zusätzlich auch Bilder, Stylesheets (CSS) und andere Ressourcen.  
  Dadurch ist es langsamer und wird oft später ausgeführt.

---

## 💡 Warum das wichtig ist

Wenn man direkt mit `document.getElementById(...)` arbeitet, kann es passieren, dass das gesuchte Element noch gar nicht existiert, weil das HTML noch nicht vollständig geladen wurde.

In diesem Fall bekommt man `null` zurück und der Code funktioniert nicht wie erwartet.

Durch `DOMContentLoaded` wird sichergestellt, dass:

- das HTML komplett geladen ist
- alle Elemente im DOM vorhanden sind
- JavaScript sicher auf diese Elemente zugreifen kann

---

## 🔹 3. Klick auf „Bookmark hinzufügen“

```js
addBookmarkBtn.addEventListener('click', () => {
```

👉 Wenn der Button geklickt wird - Werte auslesen

```js
const name = bookmarkNameInput.value.trim();
const url = bookmarkUrlInput.value.trim();
//.trim() entfernt Leerzeichen am Anfang/Ende
// Prüfen, ob beide Felder ausgefüllt sind
if (name && url) {
```

## 🔹 4. Bookmark erstellen & speichern

```js
const bookmark = { name, url };

//👉 Ein Objekt wird erstellt, z. B.:

{ "name": "Google", "url": "https://google.com" }

// Dann passiert:

addBookmarkToDOM(bookmark);

// ➡️ Fügt das Bookmark in die HTML-Liste ein (visuell)

saveBookmark(bookmark);

// ➡️ Speichert es im localStorage (dauerhaft im Browser)

bookmarkNameInput.value = '';
bookmarkUrlInput.value = '';

// ➡️ Eingabefelder werden geleert
```

## 🔹 5. Fehlerfall

```js
else {
    alert('Please enter both a name and a URL for the bookmark.');
}
```

👉 Wenn etwas fehlt → Popup-Meldung

## 🔹 6. Laden gespeicherter Bookmarks

```js
function loadBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.forEach(bookmark => addBookmarkToDOM(bookmark));
}
```

👉 Was passiert hier:

```js
localStorage.getItem('bookmarks')
//→ holt gespeicherte Daten (als String)
JSON.parse(...)
//→ wandelt String zurück in ein Array von Objekten
|| []
//→ falls nichts gespeichert ist → leeres Array
forEach(...)
//→ jedes Bookmark wird in die Liste eingefügt
```

## Funktionen

### 🔹 Bookmarks aus dem Speicher holen

```javascript
function getBookmarksFromStorage() {
    const bookmarks = localStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
}
```

Es wird versucht, gespeicherte Bookmarks aus dem Browser zu holen.
Die Daten liegen im localStorage als Text (String) vor.

Wenn etwas gefunden wird, wird dieser Text mit JSON.parse in ein JavaScript-Array umgewandelt.
Falls nichts gespeichert ist, wird stattdessen ein leeres Array zurückgegeben.

👉 Ergebnis: Man bekommt immer ein Array, mit dem man weiterarbeiten kann.

## 🔹 Bookmark speichern

```javascript
function saveBookmark(name, url) {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.push({ name, url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
```

Zuerst werden alle bereits gespeicherten Bookmarks geladen.

Dann wird ein neues Bookmark als Objekt hinzugefügt (mit Name und URL).

Danach wird die komplette Liste wieder im localStorage gespeichert.
Dabei wird das Array mit JSON.stringify in einen String umgewandelt.

👉 Wichtig:
Der localStorage kann nur Strings speichern, deshalb ist die Umwandlung nötig.

## 🔹 Bookmarks beim Laden der Seite anzeigen

```javascript
function loadBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.forEach(bookmark => addBookmark(bookmark.name, bookmark.url));
}
```

Hier werden die gespeicherten Bookmarks aus dem localStorage geladen.

Falls nichts vorhanden ist, wird ein leeres Array verwendet.

Danach wird jedes Bookmark einzeln durchgegangen und mit einer Funktion zur Anzeige hinzugefügt.

👉 Diese Funktion sorgt dafür, dass die Bookmarks nach einem Neuladen der Seite wieder sichtbar sind.

## 🔹 Bookmark löschen

```javascript
function removeBookmark(name, url) {
    let bookmarks = getBookmarksFromStorage();
    bookmarks = bookmarks.filter(bookmark => bookmark.name !== name || bookmark.url !== url);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
```

1. Zuerst werden alle gespeicherten Bookmarks geladen.
2. Dann wird die Liste gefiltert:
3. Das Bookmark, das gelöscht werden soll, wird entfernt
4. Alle anderen bleiben erhalten
5. Danach wird die neue Liste wieder im localStorage gespeichert.

👉 Die Bedingung sorgt dafür, dass genau das Bookmark mit passendem Namen und URL entfernt wird.

🧠 Gesamtlogik dieser Funktionen

1. getBookmarksFromStorage → holt Daten aus dem Speicher
2. saveBookmark → fügt ein neues Bookmark hinzu
3. loadBookmarks → zeigt gespeicherte Bookmarks an
4. removeBookmark → löscht ein Bookmark

👉 Der localStorage wird hier wie eine kleine Datenbank im Browser benutzts

## 🔹 Funktion: Bookmark zur Liste hinzufügen

```javascript
function addBookmark(name, url) {
```

Eine Funktion wird definiert, die einen Namen und eine URL bekommt.
Diese Daten werden verwendet, um ein neues Bookmark zu erstellen und anzuzeigen.

## 🔹 Listenelement erstellen

```javascript
const li = document.createElement('li');
```

Ein neues Listenelement wird erzeugt.
Dieses Element dient als Container für ein einzelnes Bookmark.

## 🔹 Link erstellen

```javascript
const link = document.createElement('a');
link.href = url;
link.textContent = name;
link.target = '_blank';
```

Ein Link wird erstellt, der:

- die URL als Ziel hat
- den Namen als sichtbaren Text anzeigt
- sich in einem neuen Tab öffnet

## 🔹 Remove-Button erstellen

```javascript
const removeButton = document.createElement('button');
removeButton.textContent = 'Remove';
```

Ein Button wird erzeugt und mit „Remove“ beschriftet.
Dieser Button dient dazu, das Bookmark zu löschen.

## 🔹 Klick-Event für Löschen

```javascript
removeButton.addEventListener('click', () => {
    bookmarkList.removeChild(li);
    removeBookmark(name, url);
});
```

Wenn der Button geklickt wird, passieren zwei Dinge:

1. Das Listenelement wird aus der HTML-Liste entfernt
2. Das Bookmark wird aus dem localStorage gelöscht

👉 Wichtig:

1. removeChild(li) entfernt das Element aus der Ansicht
2. removeBookmark(...) sorgt dafür, dass es auch wirklich gespeichert weg ist

## 🔹 Elemente zusammenbauen

```javascript
li.appendChild(link);
li.appendChild(removeButton);
```

Der Link und der Button werden in das Listenelement eingefügt.

## 🔹 Zur Liste hinzufügen

```javascript
bookmarkList.appendChild(li);
```

Das fertige Listenelement wird zur Bookmark-Liste hinzugefügt und ist jetzt sichtbar auf der Seite.
